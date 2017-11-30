import json
from glob import glob
import os

import requests
from google.cloud import firestore


SEARCH_RESULTS_GLOB = './data/s*.json'
WAYPOINTS_FILE = './data/waypoints.json'
DIRECTIONS_FILE = './data/directions.json'

db = firestore.Client('opendirection-1508138057112')


def upload_waypoints():
    col = db.collection('waypoints')
    for key, value in json.load(open(WAYPOINTS_FILE, 'r')).items():
        col.document(key).set(value)


def upload_directions():
    col = db.collection('directions')
    for key, value in json.load(open(DIRECTIONS_FILE, 'r')).items():
        col.document(key).set(value)


def upload_search_results():
    col = db.collection('search')
    for filename in glob(SEARCH_RESULTS_GLOB):
        key = os.path.splitext(os.path.basename(filename))[0]
        value = json.load(open(filename, 'r'))
        col.document(key).set(value)


def get_all_waypoints():
    col = db.collection('waypoints')
    for doc in col.get():
        location = doc.to_dict().get('location', {})
        if not location or not isinstance(location, dict):
            continue
        yield doc.id, location['latitude'], location['longitude']


def get_map_thumbnail(lat, lng):
    zoom = 15
    size = 100

    url = 'https://maps.googleapis.com/maps/api/staticmap?center={lat},{lng}&zoom={zoom}&size={size}x{size}&maptype=roadmap&markers=color:blue%7Clabel:S%7C{lat},{lng}&key={api_key}'
    api_key = 'AIzaSyDZ9GLYRxUxqNxxI_KGLNuGSRO3d5rdbXw'
    return requests.get(url.format(api_key=api_key, lat=lat, lng=lng, zoom=zoom, size=size), stream=True)


def create_maps():
    for waypoint_id, lat, lng in get_all_waypoints():
        r = get_map_thumbnail(lat, lng)
        with open('maps/%s.png' % (waypoint_id), 'wb') as f:
            for chunk in r:
                f.write(chunk)


if __name__ == '__main__':
    upload_waypoints()
    upload_directions()
    upload_search_results()
