<html>
<head>
    <title>
        Hi
    </title>
</head>
<body>
    <b>Hello {{username}}!</b>

    <ul>
        %for thing in things:
        <li>{{thing}}</li>
        %end
    </ul>

<form action="/favorite_fruit" method="POST">
What is your favorite fruit?
<input type="text" name="fruit" size="40" value=""><br>
<input type="submit" value="Submit">
</form> 

</body>

</html>