import os
import random
import string
import datetime
from git import Repo
from bs4 import BeautifulSoup


# Function to generate random text
def generate_random_text(length):
    words = [
        "Tanmay Roy",
        "Anurag Jha",
        "Manas Pratim Biswas",
        "Sherlocked 2024",
        "Srijan 2024",
        "Jadavpur University",
        "Boli Hochche Ta Ki?",
        "Hok Kolob",
        "Cazz",
        "Bawal",
        "GG",
        "OP",
        "HokUnion",
        "FETSU",
        "Long Live Revolution",
        "Jai Hind",
    ]
    random_text = " ".join(random.choices(words, k=length))
    return random_text


# Function to update the HTML file
def update_html_file(html_file, random_text, alert_message):
    with open(html_file, "r") as file:
        soup = BeautifulSoup(file, "html.parser")
        div = soup.find("div", id="randomText")
        if div:
            div.string = random_text
        else:
            new_div = soup.new_tag("div", id="randomText")
            new_div.string = random_text
            soup.body.append(new_div)

    with open(html_file, "w") as file:
        file.write(str(soup))

    # Update script tag with alert message
    with open(html_file, "r") as file:
        # content = file.read()
        # content = content.replace("/* ALERT MESSAGE */", f"alert('{alert_message}');")
        soup = BeautifulSoup(file, "html.parser")
        script = soup.find("script", id="alertScript")
        if script:
            script.string = f"alert(`{alert_message}`)"
        else:
            new_alertScript = soup.new_tag("script", id="alertScript")
            new_alertScript.string = f"alert(`{alert_message}`)"
            soup.body.append(new_alertScript)

    with open(html_file, "w") as file:
        file.write(str(soup))


# Function to commit changes
def commit_changes(repo, commit_message):
    repo.index.add(["chat.html"])
    repo.index.commit(commit_message)


# Main function
def main():
    total_commits = int(input("Enter total number of commits: "))
    bug_commit_position = int(
        input(
            "Enter the position of commit where the bug needs to be introduced (1-indexed): "
        )
    )
    random_text_length = int(input("Enter the length of random text (in words): "))

    # Initialize Git repository
    repo = Repo.init(os.getcwd())

    # Generate random text
    random_text = generate_random_text(random_text_length)

    # Update HTML file and commit changes
    for i in reversed(range(total_commits)):
        if i + 1 <= bug_commit_position:
            alert_message = f"Things fucked up : DAY {total_commits-i-1}"
        else:
            alert_message = f"Everything is good: DAY {total_commits-i-1}"

        update_html_file("chat.html", random_text, alert_message)
        commit_date = datetime.date.today() - datetime.timedelta(days=i)
        commit_message = commit_date.strftime("%B %d, %Y")
        commit_changes(repo, commit_message)


# Execute the main function
if __name__ == "__main__":
    main()
