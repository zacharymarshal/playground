<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Falling Numbers</title>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.1/lib/p5.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" rel="stylesheet">
  <script src="js/falling-numbers.js?<?= time() ?>"></script>
  <style>
    @font-face {
        font-family: Schoolbell;
        src: url("fonts/Schoolbell-Regular.ttf");
    }
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 16px;
        font-family: Schoolbell, sans-serif;
    }
    .box {
        max-width: 375px;
        width: 100%;
        min-height: 375px;
        background-color: #B2CDD6;
        backdrop-filter: blur(5px);
        margin: 2rem;
        padding: 2rem;
        border-radius: .5rem;
    }
    #falling-numbers {
        position: absolute;
        inset: 0;
        z-index: -1;
    }
  </style>
</head>
<body>
    <div id="falling-numbers">
        <div id="p5_loading"></div>
    </div>
</body>
</html>
