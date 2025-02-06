// Cypress Test Suite for Chatbot Integration

describe('Chatbot API Endpoints', () => {
  // Base URL for the backend
  const baseUrl = 'http://localhost:3000/api';

  // Sample data for testing
  const translatePayload = {
    message: 'Hello, how are you?'
  };

  const assistantPayload = {
    message: 'Can you help me with my project?',
    threadID: '',
    lastMessageID: ''
  };

  it('should translate text using /chat-gpt/translate', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/chat-gpt/translate`,
      body: translatePayload,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bot');
      expect(response.body.bot).to.be.a('string');
    });
  });

  it('should interact with assistant using /chat-gpt-asst', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/chat-gpt-asst?id=bot1`,
      body: assistantPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('bot');
      expect(response.body).to.have.property('threadID');
      expect(response.body).to.have.property('lastMessageID');
      expect(response.body.bot).to.be.a('string');
      expect(response.body.threadID).to.be.a('string');
      expect(response.body.lastMessageID).to.be.a('string');
    });
  });

  it('should enforce rate limiting on /chat-gpt/translate', () => {
    // Make 100 successful requests
    for (let i = 0; i < 100; i++) {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/chat-gpt/translate`,
        body: translatePayload,
        failOnStatusCode: false
      });
    }

    // The 101st request should be rate limited
    cy.request({
      method: 'POST',
      url: `${baseUrl}/chat-gpt/translate`,
      body: translatePayload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(429);
      expect(response.body).to.have.property('error').that.includes('Too many requests');
    });
  });

  it('should enforce rate limiting on /chat-gpt-asst', () => {
    // Make 30 successful requests
    for (let i = 0; i < 30; i++) {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/chat-gpt-asst?id=bot1`,
        body: assistantPayload,
        failOnStatusCode: false
      });
    }

    // The 31st request should be rate limited
    cy.request({
      method: 'POST',
      url: `${baseUrl}/chat-gpt-asst?id=bot1`,
      body: assistantPayload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(429);
      expect(response.body).to.have.property('error').that.includes('Too many requests');
    });
  });
});

