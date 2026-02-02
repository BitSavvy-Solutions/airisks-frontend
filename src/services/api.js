// This file handles the connection to your Azure Backend.
// Currently set to MOCK mode so you can see the UI work immediately.

const API_URL = "https://your-azure-function-app.azurewebsites.net/api";

// MOCK DATA: Simulating what the MIT/Azure database will return
const MOCK_RISKS = [
  {
    id: "1",
    title: "Deepfakes & Synthetic Media",
    description: "AI generating realistic fake audio/video that can be used for fraud, disinformation, or defamation.",
    severity: "High",
    category: "Democracy"
  },
  {
    id: "2",
    title: "Algorithmic Bias in Hiring",
    description: "AI systems inadvertently discriminating against candidates based on race, gender, or age due to biased training data.",
    severity: "Medium",
    category: "Job Security"
  },
  {
    id: "3",
    title: "Autonomous Weapons Systems",
    description: "AI-controlled weaponry that can select and engage targets without human intervention.",
    severity: "High",
    category: "Physical Safety"
  },
  {
    id: "4",
    title: "Loss of Human Agency",
    description: "Over-reliance on AI decision-making reducing human critical thinking and autonomy.",
    severity: "Low",
    category: "Mental Health"
  }
];

export const fetchRisks = async (keyword = "") => {
  // --- REAL BACKEND MODE (Uncomment this when Azure is ready) ---
  /*
  try {
    const response = await fetch(`${API_URL}/risks?search=${keyword}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch risks:", error);
    return [];
  }
  */

  // --- MOCK MODE (For MVP UI Development) ---
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!keyword) {
        resolve(MOCK_RISKS);
      } else {
        // Simple client-side filter simulation
        const lowerKeyword = keyword.toLowerCase();
        const filtered = MOCK_RISKS.filter(risk => 
          risk.title.toLowerCase().includes(lowerKeyword) || 
          risk.description.toLowerCase().includes(lowerKeyword)
        );
        resolve(filtered);
      }
    }, 500); // Simulate 500ms network latency
  });
};