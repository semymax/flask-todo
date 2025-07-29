from flask import Blueprint, render_template, request, redirect, url_for
from . import db
from .models import Task

main = Blueprint('main', __name__)

@main.route("/")
def index():
    pending_tasks = Task.query.filter_by(completed=False).all()
    completed_tasks = Task.query.filter_by(completed=True).all()
    return render_template(
        "index.html",
        pending_tasks=pending_tasks,
        completed_tasks=completed_tasks
    )

@main.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    if title:
        new_task = Task(title=title)
        db.session.add(new_task)
        db.session.commit()
    return redirect(url_for("main.index"))

@main.route("/complete/<int:task_id>")
def complete(task_id):
    task = Task.query.get(task_id)
    if task:
        task.completed = not task.completed
        db.session.commit()
    return redirect(url_for("main.index"))

@main.route("/delete/<int:task_id>")
def delete(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
    return redirect(url_for("main.index"))
