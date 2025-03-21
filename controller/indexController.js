const home = (req, res) => {
  res.status(200).send(`
    <style>
      body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f4f4;
        }
        h2 {
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #fff;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        
    </style>

   <body>

    <h2>📌 API Endpoints</h2>

    <h3>🔹 Authentication</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Auth Required</th>
        </tr>
        <tr><td>POST</td><td>/api/v1/user/login</td><td>Login and receive JWT token</td><td>❌ NO</td></tr>
        <tr><td>POST</td><td>/api/v1/user/password/forgot</td><td>User can change the password</td><td>❌ NO</td></tr>
        <tr><td>PUT</td><td>/api/v1/user/password/rest/:token</td><td>User can reset the password</td><td>❌ NO</td></tr>
        <tr><td>GET</td><td>/api/v1/user/logout</td><td>Logout and remove JWT token</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/user/me</td><td>Get logged-in user details</td><td>✅ YES</td></tr>
        <tr><td>PUT</td><td>/api/v1/user/update/me</td><td>Update user profile details</td><td>✅ YES</td></tr>
        <tr><td>PUT</td><td>/api/v1/user/update/password</td><td>User can update the password</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/user/portfolio/me</td><td>Get user details for portfolio</td><td>❌ NO</td></tr>
    </table>

    <h3>🔹 Projects</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Auth Required</th>
        </tr>
        <tr><td>POST</td><td>/api/v1/project/add</td><td>Add a new project</td><td>✅ YES</td></tr>
        <tr><td>DELETE</td><td>/api/v1/project/delete/:id</td><td>Delete project by ID</td><td>✅ YES</td></tr>
        <tr><td>PUT</td><td>/api/v1/project/update/:id</td><td>Update project by ID</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/project/getall</td><td>Get all projects for portfolio</td><td>❌ NO</td></tr>
        <tr><td>GET</td><td>/api/v1/project/get/:id</td><td>Get a single project</td><td>❌ NO</td></tr>
    </table>

    <h3>🔹 Skills</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Auth Required</th>
        </tr>
        <tr><td>POST</td><td>/api/v1/skill/add</td><td>Add a new skill</td><td>✅ YES</td></tr>
        <tr><td>DELETE</td><td>/api/v1/skill/delete/:id</td><td>Delete skill by ID</td><td>✅ YES</td></tr>
        <tr><td>PUT</td><td>/api/v1/skill/update/:id</td><td>Update skill by ID</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/skill/getall</td><td>Get all skills for portfolio</td><td>❌ NO</td></tr>
    </table>

    <h3>🔹 Software Applications</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Auth Required</th>
        </tr>
        <tr><td>POST</td><td>/api/v1/softwareapplication/add</td><td>Add a new application</td><td>✅ YES</td></tr>
        <tr><td>DELETE</td><td>/api/v1/softwareapplication/delete/:id</td><td>Delete application by ID</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/softwareapplication/getall</td><td>Get all applications for portfolio</td><td>❌ NO</td></tr>
    </table>

    <h3>🔹 Timelines</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Auth Required</th>
        </tr>
        <tr><td>POST</td><td>/api/v1/timeline/add</td><td>Add a new timeline</td><td>✅ YES</td></tr>
        <tr><td>DELETE</td><td>/api/v1/timeline/delete/:id</td><td>Delete timeline by ID</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/timeline/getall</td><td>Get all timelines for portfolio</td><td>❌ NO</td></tr>
    </table>

    <h3>🔹 Messages</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Auth Required</th>
        </tr>
        <tr><td>POST</td><td>/api/v1/message/send</td><td>Send a message in portfolio contact-me</td><td>❌ NO</td></tr>
        <tr><td>DELETE</td><td>/api/v1/message/delete/:id</td><td>Delete single message by ID</td><td>✅ YES</td></tr>
        <tr><td>GET</td><td>/api/v1/message/getall</td><td>Get all messages for Admin</td><td>❌ NO</td></tr>
    </table>

</body>
    `);
};

export default { home };
