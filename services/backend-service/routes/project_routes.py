from flask import Blueprint, request, jsonify, abort
from app import app, db
from models import Project

projects_bp = Blueprint('projects', __name__)

# list all projects
@projects_bp.route('', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects]), 200


# create project
@projects_bp.route('', methods=['POST'])
def create_project():
    # get data from post request
    data = request.get_json() or {}
    name = data.get('name')
    if not name:
        abort(400, description='Name is required')

    # add data to Project object and then to DB
    project = Project(name=name, description=data.get('description'))
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201


# update project
@projects_bp.route('/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    # Find project from DB
    project = Project.query.get_or_404(project_id)
    # update project with new data
    data = request.get_json() or {}
    if 'name' in data:
        project.name = data['name']
    if 'description' in data:
        project.description = data['description']
    db.session.commit()
    return jsonify(project.to_dict()), 200


# delete project
@projects_bp.route('/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    # Find project from DB
    project = Project.query.get_or_404(project_id)
    # Delete project
    db.session.delete(project)
    db.session.commit()
    return '', 204


# Read project
@projects_bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    # Find project from DB, return
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict()), 200
