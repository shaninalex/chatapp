import os
import sys

pr_title = os.environ['GITHUB_PR_TITLE'] if os.environ['GITHUB_PR_TITLE'] else ''

# Check pull request title for valid structure
def check_pull_request(title):
    options = [
        {'name': 'fix', 'description': 'Fixes a bug'},
        {'name': 'feat', 'description': 'Adds a new feature'},
        {'name': 'docs', 'description': 'Updates documentation'},
        {'name': 'style', 'description': 'Updates style'},
        {'name': 'refactor', 'description': 'Performs a code refactor'},
        {'name': 'test', 'description': 'Adds or updates tests'},
        {'name': 'chore', 'description': 'Other changes that don\'t modify src or test files'},
        {'name': 'revert', 'description': 'Reverts a commit'},
        {'name': 'build', 'description': 'Builds the project'},
        {'name': 'ci', 'description': 'Continuous integration'},
        {'name': 'release', 'description': 'Releases the project'},
        {'name': 'perf', 'description': 'Adds or updates performance tests'}
    ]

    scopes = [
        {'name': 'frontend'},
        {'name': 'backend'},
        {'name': 'docs'},
        {'name': 'db'},
        {'name': 'devops'},
        {'name': 'config'},
    ]

    valid = False

    for option in options:
        if pr_title.startswith(option['name'] + ': ') or pr_title.startswith(option['name'] + ' ('):
            valid = True
            break

    for scope in scopes:
        # extract scope from title between brackets
        scope_name = pr_title[pr_title.find('(') + 1:pr_title.find(')')]
        if scope_name == scope['name']:
            valid = True
            break

    if valid:
        sys.exit(0)

    print('Pull request title is not valid. Please use one of the following prefix and scope:' + '\n' + '\n'.join(['  - ' + option['name'] + ' (' + option['description'] + ')' for option in options]) + '\n' 
    + 'Scopes:' + '\n' + '\n'.join(['  - ' + scope['name'] for scope in scopes])
    + '\n' + 'Example: ' + '\n\t' + 'fix (dashboard-backend): authentication failures for mobile users')

    sys.exit(1)

check_pull_request(pr_title)
