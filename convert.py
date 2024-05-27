import json
import psycopg2
from datetime import datetime

# Connexion à la base de données PostgreSQL
conn = psycopg2.connect(
    dbname="db6",
    user="postgres",
    password="1919",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Charger le fichier .tarj
with open('montoldre_demo4.traj', 'r') as f:
    data = json.load(f)

origin = data['origin']
origin_coords = origin['coordinates']


# Insérer les données dans la base de données
for ord_id, point in enumerate(data['points']['values']):
    x, y, speed = point
    abs_x, abs_y = origin_coords[0] + x, origin_coords[1] + y
    
    # Créer un objet Point avec le SRID 4326
    point_sql = f"ST_SetSRID(ST_MakePoint({abs_x}, {abs_y}), 4326)"
    
    # Assigner un timestamp actuel pour le champ storage_timestamp
    storage_timestamp = datetime.now()
    
    cur.execute("""
        INSERT INTO point_timeref (id, point, speed, ord_id, storage_timestamp)
        VALUES (%s, ST_SetSRID(ST_MakePoint(%s, %s), 4326), %s, %s, %s)
    """, (123, abs_x, abs_y, speed, ord_id, storage_timestamp))

# Valider la transaction et fermer la connexion
conn.commit()
cur.close()
conn.close()
