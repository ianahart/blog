#! /usr/bin/env bash


#1) # Run below first if there are no versions in alembic folder to generate one
#Create revision file
          PYTHONPATH=/app alembic revision --autogenerate -m "initial revision"

    ######################### STOP ##################################
    ######################## COMMENT OUT 1.)###############################

#2.)# Let the DB start
        #   PYTHONPATH=./app/backend_pre_start.py



#3).# Run migrations
        #   PYTHONPATH=./app alembic upgrade head

#4.)# Create initial data in DB
        #   PYTHONPATH=./app/initial_data.py

