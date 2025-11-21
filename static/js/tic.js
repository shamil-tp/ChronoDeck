
    // --- Game State ---
    let size = 3;                     // 3 or 5
    let board = Array(size * size).fill(null);
    let current = "X";
    let gameOver = false;

    const boardEl   = document.getElementById("board");
    const statusEl  = document.getElementById("status");
    const resetBtn  = document.getElementById("resetBtn");
    const sizeSel   = document.getElementById("sizeSelect");
    const modeBadge = document.getElementById("modeBadge");

    // --- Init ---
    initBoard();

    // --- Event Listeners ---
    resetBtn.addEventListener("click", () => startNewGame(size));
    sizeSel.addEventListener("change", (e) => {
      size = parseInt(e.target.value, 10);
      startNewGame(size);
    });

    // --- Functions ---
    function startNewGame(n) {
      board = Array(n * n).fill(null);
      current = "X";
      gameOver = false;
      modeBadge.textContent = `${n}×${n}`;
      boardEl.classList.toggle("size-3", n === 3);
      boardEl.classList.toggle("size-5", n === 5);
      initBoard();
      updateStatus();
    }

    function initBoard() {
      boardEl.innerHTML = "";
      for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "cell btn p-0";
        cell.setAttribute("data-index", i);
        cell.setAttribute("aria-label", `Cell ${i + 1}`);
        cell.addEventListener("click", onCellClick);
        boardEl.appendChild(cell);
      }
      updateStatus();
    }

    function onCellClick(e) {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
      if (gameOver || board[idx]) return;

      board[idx] = current;
      renderCell(idx);
      const result = checkGameState();

      if (result.winner) {
        gameOver = true;
        highlightWinning(result.line);
        statusEl.innerHTML = `Winner: <strong>${result.winner}</strong>`;
        return;
      }

      if (result.draw) {
        gameOver = true;
        statusEl.textContent = "It's a draw!";
        return;
      }

      current = current === "X" ? "O" : "X";
      updateStatus();
    }

    function renderCell(idx) {
      const cell = boardEl.querySelector(`[data-index="${idx}"]`);
      const val = board[idx];
      cell.textContent = val ?? "";
      cell.classList.toggle("x", val === "X");
      cell.classList.toggle("o", val === "O");
    }

    function updateStatus() {
      statusEl.innerHTML = `Turn: <strong>${current}</strong>`;
    }

    // Checks rows, columns, and both diagonals for a full line of same mark
    function checkGameState() {
      // Build all lines (arrays of indices)
      const lines = [];

      // Rows
      for (let r = 0; r < size; r++) {
        const row = [];
        for (let c = 0; c < size; c++) row.push(r * size + c);
        lines.push(row);
      }

      // Columns
      for (let c = 0; c < size; c++) {
        const col = [];
        for (let r = 0; r < size; r++) col.push(r * size + c);
        lines.push(col);
      }

      // Main diagonal
      const diag1 = [];
      for (let i = 0; i < size; i++) diag1.push(i * size + i);
      lines.push(diag1);

      // Anti-diagonal
      const diag2 = [];
      for (let i = 0; i < size; i++) diag2.push(i * size + (size - 1 - i));
      lines.push(diag2);

      // Check each line
      for (const line of lines) {
        const first = board[line[0]];
        if (!first) continue;
        let same = true;
        for (let k = 1; k < line.length; k++) {
          if (board[line[k]] !== first) { same = false; break; }
        }
        if (same) return { winner: first, line };
      }

      // Draw?
      const draw = board.every(Boolean);
      return { winner: null, draw, line: null };
    }

    function highlightWinning(line) {
      if (!line) return;
      for (const idx of line) {
        const cell = boardEl.querySelector(`[data-index="${idx}"]`);
        cell.classList.add("winning");
      }
    }