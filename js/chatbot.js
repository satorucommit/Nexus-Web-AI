/**
 * Enhanced AI chatbot with continuous animations and better responses
 */

document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendMessage');
  
  // Define enhanced responses with more variety
  const responses = {
    greeting: [
      "Hello! I'm your AI assistant. How can I help you explore the world of artificial intelligence today?",
      "Hi there! Welcome to NeuralNexus. What would you like to know about AI?",
      "Greetings! I'm here to help you understand AI technology. What's on your mind?",
      "Welcome! I'm excited to discuss AI with you. What would you like to learn about?"
    ],
    
    about: [
      "Artificial Intelligence (AI) refers to systems that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
      "AI encompasses various technologies including machine learning, natural language processing, computer vision, and robotics. These systems learn from data to make predictions or decisions.",
      "Modern AI systems use neural networks - algorithms inspired by the human brain - to learn from large datasets and perform complex tasks like image recognition and natural language understanding."
    ],
    
    history: [
      "AI research began in the 1950s, with the term 'Artificial Intelligence' coined at the Dartmouth Conference in 1956. Since then, we've seen major breakthroughs in machine learning and deep learning.",
      "AI has gone through several cycles of excitement and disappointment, often called 'AI winters'. However, recent advances in deep learning since 2012 have led to dramatic improvements in AI capabilities.",
      "Key milestones in AI history include the development of expert systems in the 1980s, the rise of machine learning in the 1990s, and the deep learning revolution that started in 2012."
    ],
    
    applications: [
      "AI is transforming industries! In healthcare, it helps with medical diagnosis and drug discovery. In finance, it detects fraud and manages investments. In transportation, it powers autonomous vehicles.",
      "Examples of AI in everyday life include recommendation systems (Netflix, Spotify), voice assistants (Siri, Alexa), search engines (Google), and photo tagging on social media.",
      "AI enhances productivity, enables new capabilities, and helps solve complex problems across industries like healthcare, finance, transportation, and entertainment."
    ],
    
    future: [
      "The future of AI may include more general intelligence, though truly human-like AI remains a challenge. Ethical AI development focuses on transparency, fairness, and keeping humans in control.",
      "Emerging trends include explainable AI, federated learning, edge AI, and AI for scientific discovery. The focus is shifting toward more responsible and beneficial AI for humanity.",
      "Researchers are working on making AI more efficient, interpretable, and aligned with human values. The goal is AI that augments human capabilities rather than replacing them."
    ],
    
    tech: [
      "Machine learning is a subset of AI that enables systems to learn from data. Deep learning uses neural networks with multiple layers to model complex patterns.",
      "Natural Language Processing (NLP) allows computers to understand and generate human language. Computer vision enables machines to interpret visual information.",
      "Reinforcement learning teaches agents to make sequences of decisions by rewarding desired behaviors. Generative AI creates new content like images, text, and music."
    ],
    
    ethics: [
      "AI ethics focuses on ensuring AI systems are fair, transparent, and accountable. Key concerns include bias in algorithms, privacy, job displacement, and autonomous weapons.",
      "Responsible AI development involves diverse teams, bias detection, explainability, and continuous monitoring. The goal is AI that benefits all of humanity.",
      "Organizations are developing AI governance frameworks with principles like fairness, accountability, transparency, and privacy (FAT/ML) to guide ethical development."
    ],
    
    default: [
      "That's an interesting perspective! While I'm a demonstration, real AI systems can provide much more detailed information on this topic.",
      "I'm a basic chatbot with limited responses. For more in-depth information about AI, I recommend exploring our website's resources or consulting specialized AI systems.",
      "As an AI demo, I have predefined responses. Advanced AI assistants can handle more complex queries and provide personalized information.",
      "That's a great question! I suggest checking out the latest AI research papers or industry reports for the most current information on this topic."
    ]
  };
  
  // Add event listeners
  if (sendButton && userInput && chatMessages) {
    // Send message when button is clicked
    sendButton.addEventListener('click', handleUserMessage);
    
    // Send message when Enter key is pressed
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage();
      }
    });
  }
  
  // Handle user message
  function handleUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    
    // Show thinking indicator
    showThinking();
    
    // Simulate processing delay
    setTimeout(() => {
      // Get AI response
      const response = getResponse(message);
      
      // Remove thinking indicator and add AI response
      removeThinking();
      addMessage(response, 'ai');
      
      // Scroll to bottom
      scrollToBottom();
      
      // Add subtle animation to new message
      animateNewMessage();
    }, 1500);
  }
  
  // Add message to chat with enhanced styling
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    // Different avatar for user vs AI
    if (sender === 'user') {
      avatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5zm7 14v-1a7 7 0 0 0-14 0v1h14z"/>
        </svg>
      `;
    } else {
      avatar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z"/>
        </svg>
      `;
    }
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
  }
  
  // Show thinking indicator with enhanced animation
  function showThinking() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message ai-message thinking';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z"/>
      </svg>
    `;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = `<p>
      <span class="dot" style="animation-delay: 0s"></span>
      <span class="dot" style="animation-delay: 0.2s"></span>
      <span class="dot" style="animation-delay: 0.4s"></span>
    </p>`;
    
    thinkingDiv.appendChild(avatar);
    thinkingDiv.appendChild(bubble);
    
    chatMessages.appendChild(thinkingDiv);
    scrollToBottom();
    
    // Add CSS for thinking dots if not already present
    if (!document.querySelector('#thinking-dots-style')) {
      const style = document.createElement('style');
      style.id = 'thinking-dots-style';
      style.textContent = `
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-primary-500);
          margin: 0 2px;
          animation: dot-pulse 1.5s infinite ease-in-out;
        }
        
        @keyframes dot-pulse {
          0%, 100% { transform: scale(0.7); opacity: 0.7; }
          50% { transform: scale(1); opacity: 1; }
        }
        
        /* Continuous glow for AI avatar during thinking */
        .thinking .message-avatar {
          animation: glow 1.5s infinite ease-in-out;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(10, 132, 255, 0.5); }
          50% { box-shadow: 0 0 15px rgba(10, 132, 255, 0.8); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Remove thinking indicator
  function removeThinking() {
    const thinking = document.querySelector('.thinking');
    if (thinking) {
      thinking.remove();
    }
  }
  
  // Get AI response based on user input with enhanced logic
  function getResponse(message) {
    message = message.toLowerCase();
    
    // Check for different types of queries
    if (/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/.test(message)) {
      return utils.randomElement(responses.greeting);
    } else if (/\b(what is|what's|define|explain|tell me about)\s+ai\b/.test(message) || /\babout\s+ai\b/.test(message)) {
      return utils.randomElement(responses.about);
    } else if (/\b(history|origin|timeline|past|began|start|evolution)\b/.test(message)) {
      return utils.randomElement(responses.history);
    } else if (/\b(use|application|example|industry|where|how is|how can|real world)\b/.test(message)) {
      return utils.randomElement(responses.applications);
    } else if (/\b(future|next|coming|advance|progress|develop|evolve|trend)\b/.test(message)) {
      return utils.randomElement(responses.future);
    } else if (/\b(tech|technology|machine learning|deep learning|neural network|nlp|computer vision)\b/.test(message)) {
      return utils.randomElement(responses.tech);
    } else if (/\b(ethic|bias|fair|privacy|responsible|transparen)\b/.test(message)) {
      return utils.randomElement(responses.ethics);
    } else if (/\b(neuralnexus|about you|who are you|what do you do)\b/.test(message)) {
      return "I'm the NeuralNexus AI assistant, designed to help you understand artificial intelligence technology and its applications. I can answer questions about AI history, current applications, and future possibilities.";
    } else if (/\b(thank|thanks)\b/.test(message)) {
      return "You're welcome! Feel free to ask me any other questions about AI.";
    } else if (/\b(bye|goodbye|see you)\b/.test(message)) {
      return "Goodbye! Feel free to come back anytime if you have more questions about AI.";
    } else {
      return utils.randomElement(responses.default);
    }
  }
  
  // Scroll chat to bottom
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Add subtle animation to new messages
  function animateNewMessage() {
    const messages = chatMessages.querySelectorAll('.message');
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      lastMessage.style.animation = 'fadeInUp 0.5s ease-out';
      
      // Add CSS for message animation if not already present
      if (!document.querySelector('#message-animation-style')) {
        const style = document.createElement('style');
        style.id = 'message-animation-style';
        style.textContent = `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }
  
  // Add continuous subtle animations to the chat container
  function addContinuousChatAnimation() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      // Add periodic glow effect
      setInterval(() => {
        const intensity = utils.random(0.1, 0.3);
        chatContainer.style.boxShadow = `0 0 15px rgba(10, 132, 255, ${intensity})`;
      }, 4000);
    }
  }
  
  // Initialize continuous animations
  addContinuousChatAnimation();
});