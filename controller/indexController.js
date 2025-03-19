const home = (req, res) => {
  res.status(200).send(`
    <style>
    .styles{
        display:grid;
        justify-content:center;
        align-items:center;
        padding:10px;
    }
    </style>

    <div class='styles'>
    <h1>Wellcome</h1>
    </div>
    `);
};

export default { home };
