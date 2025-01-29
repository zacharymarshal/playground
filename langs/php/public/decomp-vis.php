<?php
    $problems = [
        [
            "minuend" => 32,
            "subtrahend" => 18,
            "problem" => "32 - 18 =",
        ],
        [
            "minuend" => 43,
            "subtrahend" => 27,
            "problem" => "43 - 27 =",
        ],
        [
            "minuend" => 43,
            "subtrahend" => 7,
            "problem" => "43 - 7 =",
        ],
    ];
    $problem = $problems[$_GET['p'] ?? 0];
?>
<html>
<head>
  <title>Decomposition Visualization</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.min.js"></script>
  <style>
    body {
      font-family: 'Schoolbell', cursive;
      font-size: 32px;
    }
    .container {
        margin: 0 auto;
        padding: 1rem;
        max-width: 800px;
    }
    #vis {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .problem {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .minuend .drawing-object {
        position: absolute;
        top: -16px;
        z-index: -1;
        left: -19px;
        opacity: .5;
    }
    .minuend {
        position: relative;
    }
  </style>
</head>
<body>
    <div class="container">
    <div class="problem">
        <div class="minuend">
            <svg class="drawing-object" viewBox="-14.125 0 69.125 68.125" style="width: 69.125px; height: 68.125px;"><path d="M 20.00,20.00Q 20.00,20.50 20.00,20.92T 19.88,21.67 19.57,22.30 19.20,23.05 18.71,23.96 18.21,24.84 17.63,26.00 16.81,27.50 15.88,28.94 14.88,30.31 13.88,31.69 12.88,32.94 12.00,34.00 11.19,34.94 10.38,35.81 9.63,36.63 8.94,37.38 8.31,38.06 7.75,38.69 7.50,39.00 7.25,39.31 7.00,39.63 7.00,39.63 6.75,39.94 6.50,40.25 6.50,40.25 6.31,40.63 6.13,41.00 6.13,41.00 6.00,41.31 5.94,41.94 6.13,42.50 6.44,42.94 6.94,43.25 7.69,43.38 8.63,43.31 9.63,43.06 10.63,42.63 11.56,42.13 12.44,41.56 13.38,41.00 14.25,40.44 15.00,39.88 15.69,39.31 16.38,38.75 17.13,38.25 17.88,37.69 18.63,37.13 19.38,36.56 20.13,35.94 20.88,35.25 21.69,34.56 22.56,33.88 23.44,33.13 23.88,32.75 24.31,32.38 25.19,31.63 25.63,31.25 26.06,30.94 26.94,30.31 27.38,30.00 27.81,29.75 28.25,29.50 28.69,29.25 29.13,29.00 29.13,29.00 29.50,28.88 29.88,28.75 29.88,28.75 30.19,28.75 30.50,28.75 30.69,28.88 31.00,29.19 31.13,29.63 31.06,30.31 30.81,31.25 30.63,31.75 30.31,32.31 30.00,32.88 29.63,33.44 28.88,34.56 28.13,35.63 27.38,36.63 26.63,37.56 25.94,38.38 25.63,38.75 25.31,39.13 25.00,39.50 24.75,39.88 24.25,40.56 23.75,41.19 23.50,41.50 23.31,41.88 23.13,42.25 22.88,42.63 22.63,43.00 22.44,43.44 22.25,43.88 22.06,44.31 21.88,44.75 21.75,45.19 21.63,45.63 21.63,45.63 21.63,45.63 21.56,46.00 21.50,46.38 21.56,46.75 21.63,47.13 21.75,47.38 22.06,47.81 22.56,48.06 23.25,48.06 24.06,47.88 24.50,47.75 25.00,47.56 25.50,47.38 26.00,47.19 26.50,47.00 26.50,47.00 27.00,46.81 27.50,46.63 27.50,46.63 28.00,46.50 28.50,46.38 28.50,46.38 29.00,46.25 29.50,46.13 29.50,46.13 30.00,46.06 30.50,46.00 31.00,46.00 31.50,46.00 31.94,45.94 32.38,45.88 33.69,45.44" stroke="#008001" stroke-opacity="1" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round" class="drawing-path" data-is-drawing-path="1"></path></svg>
            <div class="minuend-text"><?= $problem['minuend'] ?></div>
        </div>
        <div class="operator">-</div>
        <div class="subtrahend"><?= $problem['subtrahend'] ?></div>
        <div class="equals">=</div>
    </div>
    <div id="vis"></div>
    <div>
      How does this picture help you see the answer?
    </div>
  </div>
  <script src="js/decomp-vis.js?<?= time() ?>"></script>
</body>
</html>
