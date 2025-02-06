This blog is a work in progress. It was co-progammed using a variety of code assistants and AI LLMs.
 I plan to keep improving the look and feel of the blog gradually.  Eventually I hope to provide this platform as a service for other companies.

I have more than 30 years experience as a mostly self-taught programmer.
I hesitated to use AI for development for about a year while keeping an eye on the progress of tools such as Microsoft CoPilot but as the tools have progressed rapidly recently I decided to jump on board.

Last might I watched this video about using Bolt.new to create a full app. I like Bolt but recently I have been using Cline (an extension in  Visual Studio Code) for active development. The main reason is that I want to manage my code in VS code rather than develop in a web view.

Today's activity based on the video and my usual daily routine which, even on Sundays, has been to create a new app from scratch to see how far and fast I could get. I started by writing a detailed prompt that I thought covered al of the requirements however Cline quickly started to diverge from my idea, adding TypeScript and JSX for components. I have never used JSX components as this is something usually used for React.

It's also the first time for me to use images as guides. For this reason I used Claude Sonnet 3.5 (although I later realized that even Chat GPT min-4 can accept images so I might try this exercise again with that model which is much cheaper.

The cost to develop this project as far as I did today was approximately $3. It might have cost less if I had tried to switch to Haiku (or Chat GPT-4-0-mini) partly though the project.

As I progressed through the project 'exceeding rate limit' error messages become more and more common. It is probably because the context gradually builds up. It might be better to break up the prompt into smaller tasks.
I just kept waiting for a minute and trying again and but eventually I got error after every new prompt.

This project was initialized with the following prompt. At the first (or second) try, the front-end was mostly completed and the first page loaded but images, logos etc. are not displayed. It took me about 1 hour to trouble shoot and finally fix the issue. This is probably because I want to use the Vue framework which, while popular, is not as widely used.

------------------ PROMPT ---------------------------

I need an app to organize information that I come across daily.

Code organization should follow modern best practices including using Single File Components when possible, composables for managing and accessioning APIs and and sharing composables between various projects. 

The front-end and back-end folders should be independent projects within the same parent project.

Always use the latest stable versions for dependencies.

I want the app to use my standard stack which is:

Front end: Vuejs 3 with Script setup syntax. vue i18-n, Pinia for state storage, and tailwind for css. 
The UI should be modern, sophisticated and intuitive. 

It should incorporate dark and light modes and allow switching between them as a well as switching between at least Japanese and English languages. Use animation and visual effects such as halos for UI to add engagement and make it dynamic.

Visual interface components from shadcn-vue can be used.

Back end: node.js, Express server including rate limiting and other standard security features.
Access to an admin dashboard or protected routes should be done using the simple-secure-authentication-protocol described in the document: simple-secure-authentication-protocol_V1*

It should include login and logout and external functions.
Database, user-management and storage will be managed by Supabase. 

It should provide a way for new users to register and after registration, take them to a welcome page explaining some of the key features.
When generating the code, proceed in a careful, logical flow and confirm any required information before proceeding to the next step.

At the end as I was becoming more frustrated I asked the AI model how I could avoid the problems that had surfaced. It suggested this prompt which I may include next time although my expectations for immediate improvement are not high. The fact is that AI programming assistants are quite good and improving but still only about 50%accurate which makes it quite a hit and miss affair. Still worthwhile because the hits can save many hours of work.
--------------------------  END OF PROMPT -------------------

* I will explain the simple-secure-authentication-protocol in a follow up post.