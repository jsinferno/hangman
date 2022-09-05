from flask import Flask, render_template, url_for, request, redirect, session, flash
from random import randint as ri
import requests


app = Flask(__name__)
app.secret_key = "djhdh"

@app.route("/", methods = ["POST", "GET"])
def start():

    if request.method == "POST":
        session.pop("word",None)
        flash("Hangman!!", "info")
        return render_template("home.html")

    flash("Hangman!!", "info")
    return render_template("home.html")

@app.route("/game", methods = ["POST", "GET"])
def game():
    if request.method == "POST":
        if "word" in session: session.pop("word", None)
        mini,maxi = [request.form.get("min"),request.form.get("max")]
        if mini: 
            mini = int(mini)
        else: mini = 2

        if maxi: 
            maxi = int(maxi)
        else: maxi = 14

        if mini >= maxi or maxi == 0: 
            flash("Invalid Lengths", "info")
            return redirect("/")

        # myfile = open("static/words.txt","r")

        # words = myfile.read().split(" ")
        # words = [x.split(",") for x in words]
        # words = [x for y,x in words if mini <= int(y) <= maxi]
        
        # word = words[ri(0,len(words)-1)]

        # myfile.close()

        
        URL = f"https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minDictionaryCount={mini}&minLength=1&maxLength={maxi}&api_key=YOURAPI"


        response = requests.get(URL)
        print(response.text)
        if "word" in response.json():
            word = response.json()["word"]
        else:
            flash("There was a problem", "info")
            return redirect("/")


        session["word"] = word

        return render_template("game.html", word = word)

    
    return redirect("/")

@app.route("/result", methods = ["POST", "GET"])
def result():
    if "word" not in session: return redirect("/")
    
    if request.method == ("GET"):
        flash(f"You're left hanging, {session['word']}", "info")
        session.pop("word",None)
        return render_template("result.html")

    flash("Well done... This time", "info")
    session.pop("word",None)
    return render_template("result.html")


if __name__ == "__main__":
    app.run(debug = True)