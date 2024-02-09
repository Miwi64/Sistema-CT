from django_seed import Seed
from tasks.models import *
seeder = Seed.seeder()



seeder.add_entity(Alumnos, 5000)
seeder.add_entity(Titulados, 5000)
seeder.add_entity(Certificados, 5000)

inserted_pk = seeder.execute()
