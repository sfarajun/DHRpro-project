from .project_routes import projects_bp
from .task_routes import tasks_bp

# register project and task blueprints
def register_blueprints(app):
    app.register_blueprint(projects_bp, url_prefix='/projects')
    app.register_blueprint(tasks_bp, url_prefix='/tasks')
