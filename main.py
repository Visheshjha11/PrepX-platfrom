import os
import random
import subprocess
from datetime import datetime, timedelta


def get_positive_int(prompt, default=20):
    while True:
        try:
            user_input = input(f"{prompt} (default {default}): ")
            if not user_input.strip():
                return default
            value = int(user_input)
            if value > 0:
                return value
            else:
                print("Please enter a positive integer.")
        except ValueError:
            print("Invalid input. Please enter a valid integer.")


def get_repo_path(prompt, default="."):
    while True:
        user_input = input(f"{prompt} (default current directory): ")
        if not user_input.strip():
            return default
        if os.path.isdir(user_input):
            return user_input
        else:
            print("Directory does not exist. Please enter a valid path.")


def get_filename(prompt, default="data.py"):
    user_input = input(f"{prompt} (default {default}): ")
    if not user_input.strip():
        return default
    return user_input


def random_date_between(start_date, end_date):
    delta = end_date - start_date
    random_seconds = random.randint(0, int(delta.total_seconds()))
    return start_date + timedelta(seconds=random_seconds)


def make_commit(date, repo_path, filename):
    filepath = os.path.join(repo_path, filename)

    # Only a comment is added
    with open(filepath, "a") as f:
        f.write("<!-- This is a single-line comment -->\n")

    subprocess.run(["git", "add", filename], cwd=repo_path)

    env = os.environ.copy()
    date_str = date.strftime("%Y-%m-%dT%H:%M:%S")
    env["GIT_AUTHOR_DATE"] = date_str
    env["GIT_COMMITTER_DATE"] = date_str

    subprocess.run(
        ["git", "commit", "-m", "issue fixed"],
        cwd=repo_path,
        env=env
    )


def main():
    print("=" * 60)
    print("🌱 Fixed Date Git Commit Generator 🌱")
    print("=" * 60)

    num_commits = get_positive_int("How many commits do you want to make", 20)
    repo_path = get_repo_path("Enter the path to your local git repository", ".")
    filename = get_filename("Enter the filename to modify", "data.py")

    # 🔒 UPDATED DATE RANGE (1 Sept 2025 → 1 Oct 2025)
    start_date = datetime(2025, 9, 11, 0, 0, 0)
    end_date   = datetime(2025, 9, 25, 23, 59, 59)

    print(f"\nMaking {num_commits} commits")
    print(f"Date range : {start_date} → {end_date}")
    print(f"File       : {filename}")
    print(f"Message    : issue fixed\n")

    for i in range(num_commits):
        commit_date = random_date_between(start_date, end_date)
        print(f"[{i+1}/{num_commits}] Commit at {commit_date}")
        make_commit(commit_date, repo_path, filename)

    print("\nPushing commits to remote repository...")
    subprocess.run(["git", "push"], cwd=repo_path)

    print("✅ Done! Check your GitHub contribution graph.")


if __name__ == "__main__":
    main()
