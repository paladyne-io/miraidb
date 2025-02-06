
CONTEXT:
I'm building a platform to host and modernize small business websites. The platform will use AI to analyze existing websites and suggest/implement improvements. I'm starting with my own website as a test case.
TECHNICAL STACK:

Frontend: Vue.js 3 + Nuxt
Backend: Node.js + Express
Database: Supabase
Hosting: Fly.io
AI: Claude API integration
Version Control: GitHub

KEY OBJECTIVES:

Analyze existing websites for improvement opportunities
Generate modern, optimized templates
Provide cost-effective hosting ($15-20/month)
Implement automated SSL via Let's Encrypt
Create simple content management interface

PROJECT STRUCTURE:

  /apps
    /platform         # Main management platform
    /clients          # Client websites
    /marketing        # My business website
  /packages
    /core-components  # Shared components
    /themes          # Website templates
  /tools             # Development scripts

IMPLEMENTATION PHASES:

MVP Setup

Basic Express API with Claude integration
Website analysis endpoints
Template generation
Simple deployment to Fly.io


Website Migration

Move existing website to platform
Implement automated deployment
Set up SSL certificates


AI Integration

Website analysis functionality
Template generation
Content optimization
SEO recommendations


Management Interface

Customer dashboard
Content editing
Deployment controls
Analytics



CURRENT TASK:
[Specify the current task you're working on]
Please help me:

Implement the specified task
Suggest best practices and optimizations
Provide code examples and configurations
Identify potential issues and solutions
Recommend next steps

Additional considerations:

Keep code modular and maintainable
Focus on security best practices
Optimize for performance
Consider scalability
Maintain clear documentation

-- Comments
You can use this as a base prompt and add specific questions or tasks as needed. For example:
"Using the context above, help me implement the website analysis API endpoint using Claude..."
This gives Claude the full context of your project while allowing you to focus on specific implementation details. Would you like me to provide a few example task-specific prompts as well?
-- END --

After each code change:

1. Analyze modified code files to extract core functionality and patterns
2. Update corresponding prompts in prompts/ directory or prompts.md to reflect current implementation

Skip prompt updates for minor changes (formatting, comments, variable renames).
