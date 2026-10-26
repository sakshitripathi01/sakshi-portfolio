Sakshi — Portfolio Website (Premium Dark Creative-Tech Redesign, v2)
===================================================

FILES
-----
index.html   Page structure and all content
styles.css   Design tokens (top of file), components, and the redesign layer (bottom)
script.js    Theme toggle (remembered), mobile menu, scroll-reveal, active-nav highlight,
             research modal, contact form validation, toast messages

HOW TO PREVIEW
--------------
Double-click index.html (keep all three files in the same folder).
No build step, install or server needed. Fonts load from Google Fonts when online;
offline, the site falls back to system fonts.

WHAT STILL NEEDS YOUR REAL DETAILS (search index.html for "to be added" / "[")
-----------------------------------------------------------------------------
- Experience: employer name, start date, responsibilities
- Publication ("Graph-Theoretic Clustering"): journal/conference, year, DOI/link
- Software development projects card and tech stack (Skills section)
- Planned Excel / Data Analytics projects: titles and scope (marked "Planned")
- Contact: email, LinkedIn, GitHub (Contact section + footer)
- Project buttons: GitHub / View Project links (elements with data-placeholder)
- Resume: link the Download Resume button (id="resumeBtn") to your PDF
Elements with data-placeholder show a small "hasn't been added yet" message when
clicked. To activate one: replace href="#" with the real URL and delete the
data-placeholder attribute (and the "is-placeholder" class, to remove dashed styling).

CONTACT FORM
------------
Validation works, but the form is not connected to an email service, so nothing is sent.
The success message says so. Connect a service (e.g. Formspree) when ready.

COLOURS
-------
Edit the variables at the top of styles.css (--blue = electric blue, --purple = violet).

V2 NOTES
--------
- Fonts: Bricolage Grotesque (display), Instrument Serif (accent), Geist (body), JetBrains Mono.
- Publication fields (journal, date, co-authors, DOI, URL) are in the "pub-meta" block in index.html;
  replace each "[To be added]" (class="ph") with real text and add the real link to "View Publication".
- Research modal text was reduced to facts from your metrics; earlier interpretive claims were removed.
- The dashboard in Analytics is an illustrative mock-up, labelled as not real data.
- The previous version is archived in ../portfolio-redesign-v1-archive/
