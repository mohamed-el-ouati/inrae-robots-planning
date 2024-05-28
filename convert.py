import datetime
import json
import folium
from pyproj import Proj, transform
import psycopg2


file_path = 'C:/Users/ayhatmi/Desktop/paths/montoldre_rose2_cc.traj'

with open(file_path, 'r') as file:
    data = json.load(file)


origin_lat, origin_lon, origin_alt = data['origin']['coordinates']
points = data['points']['values']


local_points = [(point[0], point[1]) for point in points]

wgs84 = Proj(init='epsg:4326')  # WGS84
local_proj = Proj(proj='aeqd', lat_0=origin_lat, lon_0=origin_lon)

geo_points = [transform(local_proj, wgs84, x, y) for x, y in local_points]


m = folium.Map(location=[origin_lat, origin_lon], zoom_start=15)

dbname="db6"
user="postgres"
password="1919"
host="localhost"
port="5432"


conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
cur = conn.cursor()

insert_query = "INSERT INTO public.point_timeref (id, point, speed, ord_id, storage_timestamp) VALUES (130, ST_GeomFromText('SRID=4326;POINT(%s %s)'), %s, %s, %s)"

speed = 0.0  
storage_timestamp = datetime.date(2022,12,22) 
ord_id = 0

for lon, lat in geo_points:
    ord_id = ord_id + 1
    cur.execute(insert_query, (lon, lat, speed, ord_id + 1, storage_timestamp))

conn.commit()
cur.close()
conn.close()

