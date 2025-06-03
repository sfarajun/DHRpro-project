from flask import Blueprint, request, jsonify, abort
from app import app, db
from models import Task
import traceback


tasks_bp = Blueprint('tasks', __name__)

# list all tasks
@tasks_bp.route('', methods=['GET'])
def get_tasks():
    project_id = request.args.get('project_id', type=int)
    query = Task.query
    if project_id:
        query = query.filter_by(project_id=project_id)
    tasks = query.all()
    return jsonify([t.to_dict() for t in tasks]), 200


# create task
@tasks_bp.route('', methods=['POST'])
def create_task():
    try:
        data = request.get_json() or {}
        required = ['project_id', 'name']
        if not all(k in data for k in required):
            abort(400, description='project_id and name are required')
        task = Task(
            project_id=data['project_id'],
            name=data['name'],
            description=data.get('description'),
            status=data.get('status', 'pending'),
            due_date=data.get('due_date')
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201
    except Exception as e:
        traceback.print_exc() 
        return jsonify({ 'error': 'Internal server error.', 
                         'details': str(e) }), 500





# update task
@tasks_bp.route('/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json() or {}
    for field in ['name', 'description', 'status', 'due_date']:
        if field in data:
            setattr(task, field, data[field])
    db.session.commit()
    return jsonify(task.to_dict()), 200

# delete task
@tasks_bp.route('/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return '', 204


# Read task
@tasks_bp.route('/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify(task.to_dict()), 200
