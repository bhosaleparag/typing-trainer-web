import React from "react";

const Tips = () => {
  const tips = [
    {
      title: "Use all ten fingers",
      content: `Using all ten fingers to type is the fastest and most efficient way to type. If you are only using a few fingers, you are slowing yourself down. To learn to use all ten fingers, there are many different typing exercises that you can do. You can find these exercises online or in typing books.`,
    },
    {
      title: "Keep your wrists straight and relaxed",
      content: `When you are typing, it is important to keep your wrists straight and relaxed. This will help to prevent fatigue and injuries. To keep your wrists straight, make sure that your keyboard is at a comfortable height and that your hands are in a neutral position. To keep your wrists relaxed, avoid tensing your muscles.`,
    },
    {
      title: "Position your monitor at eye level",
      content: `Positioning your monitor at eye level will help to improve your posture and reduce eye strain. To position your monitor at eye level, sit up straight with your feet flat on the floor. The top of your monitor should be at eye level. If your monitor is too high or too low, you can use a monitor stand to adjust its height.`,
    },
    {
      title: "Take breaks every 20-30 minutes to avoid fatigue",
      content: `Typing for long periods of time can cause fatigue. To avoid fatigue, take breaks every 20-30 minutes. During your breaks, stand up and stretch, or walk around. You can also use this time to rest your eyes.`,
    },
    {
      title: "Practice regularly to improve your speed and accuracy",
      content: `The more you practice typing, the better you will become at it. To improve your speed and accuracy, try to type for at least 30 minutes every day. You can practice by typing documents, emails, or even just random words. There are also many different typing games and exercises that you can do to improve your skills.`,
    },
    {
      title: "Use the correct homophone for the word you are trying to type",
      content: `Homophones are words that sound the same but have different meanings. For example, "to" and "too" are homophones. When you are typing, it is important to use the correct homophone for the word you are trying to type. If you are not sure which homophone to use, look it up in a dictionary.`,
    },
    {
      title: "Use punctuation correctly",
      content: `Punctuation is important for improving the readability of your writing. When you are typing, make sure to use punctuation correctly. This includes using commas, periods, question marks, exclamation points, and apostrophes. If you are not sure how to use punctuation correctly, look up the rules in a grammar book or online.`,
    },
    {
      title: "Proofread your work carefully before sending it off",
      content: `Before you send off a document or email, it is important to proofread it carefully. This will help to catch any errors that you may have made. When proofreading, pay attention to grammar, spelling, and punctuation. You can also ask someone else to proofread your work for you.`,
    },
  ];

  return (
    <div className="typing-tips">
      <h1>Typing Tips</h1>
      <ul>
        {tips.map((tip) => (
          <li key={tip.title}>
            <h2>{tip.title}</h2>
            <p>{tip.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
