import React, { useState } from "react";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------
// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: `${isPlayer ? "Player" : "Monster"} takes ${damage} damage`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: `Player heals ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMosterHealth] = useState(100);
  const [turnCount, setTurncount] = useState(0);
  const [battlelog, setBattlelog] = useState([]);
  const [gameover, setGameover] = useState(false);

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  const checkGameOver = (newPlayerHealth, newMonsterHealth) => {
    if (newPlayerHealth === 0 || newMonsterHealth === 0) {
      setGameover(true);
    }
  };

  const handleAttack = () => {
    if (gameover) return;

    const playerDamage = getRandomValue(5, 12);
    const newMosterHealth = Math.max(0, monsterHealth - playerDamage);

    const monsterDamage = getRandomValue(8, 15);
    const newPlayerHealth = Math.max(0, playerHealth - monsterDamage);

    const newBattleLog = [
      ...battlelog,
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
    ];

    setMosterHealth(newMosterHealth);
    setPlayerHealth(newPlayerHealth);
    setBattlelog(newBattleLog);
    setTurncount(turnCount + 1);

    checkGameOver(newPlayerHealth, newMosterHealth);
  };

  const handleHeal = () => {
    if (gameover) return;

    const healing = getRandomValue(10, 20);
    const newPlayerHealth = Math.min(100, playerHealth + healing);

    const newBattleLog = [...battlelog, createLogHeal(healing)];
    setPlayerHealth(newPlayerHealth);
    setBattlelog(newBattleLog);
    setTurncount(turnCount + 1);
  };

  const handleSpecialAttack = () => {
    if (gameover || turnCount % 3 !== 0) return;

    const playerDamage = getRandomValue(10, 20);
    const newMonsterHealth = Math.max(0, monsterHealth - playerDamage);

    const monsterDamage = getRandomValue(8, 15);
    const newPlayerHealth = Math.max(0, playerHealth - monsterDamage);

    const newBattleLog = [
      ...battlelog,
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
    ];

    setPlayerHealth(newPlayerHealth);
    setMosterHealth(newMonsterHealth);
    setBattlelog(newBattleLog);
    setTurncount(turnCount + 1);

    checkGameOver(newPlayerHealth, newMonsterHealth);
  };

  const KillYourself = () => {
    if (gameover) return;
    setPlayerHealth(0);
    setGameover(true);

    const newBattleLog = [
      ...battlelog,
      { isPlayer: true, isDamage: false, text: "Player Killed themself!" },
    ];
    setBattlelog(newBattleLog);
  };

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Monster Slayer</h1>
      <div>
        <h2>Monster Health:</h2>
        <div
          style={{
            width: "300px",
            height: "30px",
            backgroundColor: "grey",
            margin: "auto",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${monsterHealth}%`,
              height: "100%",
              backgroundColor: "green",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
      </div>

      <div>
        <h2>Player Health: </h2>
        <div
          style={{
            width: "300px",
            height: "30px",
            backgroundColor: "grey",
            margin: "auto",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${playerHealth}%`,
              height: "100%",
              backgroundColor: "green",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <button className="Attack" onClick={handleAttack} disabled={gameover}>
          Attack
        </button>
        <button className="Heal" onClick={handleHeal} disabled={gameover}>
          Heal
        </button>
        <button
          className="SpecialAttack"
          onClick={handleSpecialAttack}
          disabled={gameover || turnCount % 3 !== 0}
        >
          Special Attack
        </button>
        <button
          className="KillYourself"
          onClick={KillYourself}
          disabled={gameover}
        >
          Kill Yourself
        </button>
      </div>
      {gameover && (
        <h3>
          Game Over!{" "}
          {playerHealth === 0 && monsterHealth === 0
            ? "It's a draw!"
            : playerHealth === 0
            ? "Monster Wins!"
            : "Player Wins!"}
        </h3>
      )}
      <div>
        <h3>Battle Log:</h3>
        <ul>
          {battlelog.map((log, index) => (
            <li key={index} style={{ color: log.isPlayer ? "green" : "red" }}>
              {log.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Game;
