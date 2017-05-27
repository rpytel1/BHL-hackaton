from flask import Flask, render_template, send_from_directory
from flask_cors import CORS


app = Flask(__name__, template_folder='templates', static_url_path='')
CORS(app)


@app.route('/')
def root():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

if __name__ == '__main__':
    app.run(port=9080, host='0.0.0.0')
