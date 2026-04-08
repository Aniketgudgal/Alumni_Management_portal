import os

pages = {
    'dashboard': 'Overview',
    'profile': 'My Profile',
    'network': 'Alumni Network',
    'chat': 'Messages',
    'notifications': 'Notifications',
    'events': 'Events',
    'jobs': 'Job Board',
    'gallery': 'Gallery',
    'topalumni': 'Top Alumni',
    'mentorship': 'Mentorship',
    'settings': 'Settings'
}

with open('pages/alumni/dashboard.html', 'r', encoding='utf-8') as f:
    base_html = f.read()

# Update the nav links to point to physical files, not #
import re

for view_id, title in pages.items():
    # Fix the active state in sidebar
    html = base_html
    
    # Replace all nav links
    for iter_id in pages.keys():
        old_link = f'href="#" class="dash-nav-link" data-view="{iter_id}"'
        new_link = f'href="{iter_id}.html" class="dash-nav-link" data-view="{iter_id}"'
        if f'class="dash-nav-link active" data-view="{iter_id}"' in html:
             old_link = f'href="#" class="dash-nav-link active" data-view="{iter_id}"'
             new_link = f'href="{iter_id}.html" class="dash-nav-link" data-view="{iter_id}"'
             html = html.replace(old_link, new_link)
        else:
             html = html.replace(old_link, new_link)

    # Set the current link to active
    html = html.replace(f'href="{view_id}.html" class="dash-nav-link"', f'href="{view_id}.html" class="dash-nav-link active"')
    
    # Update title
    html = html.replace('<title>Dashboard | Alumni Management Portal</title>', f'<title>{title} | Alumni Management Portal</title>')
    
    # Add data-page attribute to the container so JS knows what to render
    html = html.replace('<div class="dash-view" id="dashViewContainer">', f'<div class="dash-view" id="dashViewContainer" data-page="{view_id}">')

    # Remove the old dashboard active state if it leaked
    if view_id != 'dashboard':
        html = html.replace('href="dashboard.html" class="dash-nav-link active"', 'href="dashboard.html" class="dash-nav-link"')

    with open(f'pages/alumni/{view_id}.html', 'w', encoding='utf-8') as f:
        f.write(html)

print("Generated 11 files!")
