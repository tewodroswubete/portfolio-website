from flask import Flask, render_template, request, jsonify, redirect, url_for
import re

app = Flask(__name__)

# Home page
@app.route("/")
def index():
    return render_template("index.html")

# About page
@app.route("/about")
def about():
    return render_template("about.html")

# Projects page
@app.route("/projects")
def projects():
    return render_template("projects.html")

# Contact page
@app.route("/contact")
def contact():
    return render_template("contact.html")

# Contact form submission endpoint
@app.route("/contact", methods=["POST"])
def contact_submit():
    # Get form data
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")
    
    # Validation
    errors = []
    
    if not name or len(name.strip()) < 2:
        errors.append("Name must be at least 2 characters long")
    
    if not email:
        errors.append("Email is required")
    elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        errors.append("Please enter a valid email address")
    
    if not subject or len(subject.strip()) < 5:
        errors.append("Subject must be at least 5 characters long")
    
    if not message or len(message.strip()) < 10:
        errors.append("Message must be at least 10 characters long")
    
    # If there are errors, return them
    if errors:
        # In a real app, we'd re-render the template with errors
        # For now, we'll just return a JSON response
        return jsonify({"success": False, "errors": errors}), 400
    
    # In a real application, you would process the form data here
    # e.g., send email, save to database, etc.
    
    # Success response
    return jsonify({"success": True, "message": "Thank you for your message! I will get back to you soon."})

# Newsletter subscription endpoint
@app.route("/newsletter", methods=["POST"])
def newsletter():
    email = request.form.get("email")
    
    if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"success": False, "message": "Please enter a valid email address"}), 400
    
    # In a real app, you would save the email to a database or email service
    return jsonify({"success": True, "message": "Thank you for subscribing to our newsletter!"})

# 404 Error Handler
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
    # Run on localhost:8080
    app.run(debug=True, host="0.0.0.0", port=8080)
