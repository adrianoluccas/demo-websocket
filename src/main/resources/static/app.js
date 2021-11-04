var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
	var jwt = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYTdRcEpqMFRjUE1OUGo5VlVHbE5JbFNtUk5wSTNtd1BhdFVySDhraHFrIn0.eyJleHAiOjE2MzU1NDkxMjMsImlhdCI6MTYzNTUzMTEyMywianRpIjoiYmRhNjNkN2YtMWYxNy00NjQyLTkxNWItMjA2MzliY2M5NWVkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5hZ3JvLWNoYWluLmNsdWIvYXV0aC9yZWFsbXMvYWdyb2NoYWluLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3MWVhZmFlNi1jOTBhLTRiMzAtYjY5YS05NGZkNjFkMjE0Y2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZ3JvY2hhaW4tYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjBhMTVhZjNhLTM1MzMtNDczZi1hMTJkLWQwYzM4MGNlM2E5MiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWdyb2NoYWluLWRldiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIwYTE1YWYzYS0zNTMzLTQ3M2YtYTEyZC1kMGMzODBjZTNhOTIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZHJpYW5vLmx1Y2NhcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZ2l2ZW5fbmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZW1haWwiOiJhZHJpYW5vLmx1Y2Nhc0BiYmNoYWluLmNvbS5iciJ9.Q0eo5wSVte8OGFVl5-T1QxWSnxwN_jw6RmqfURao1kKtrqfyYKGMgLw4OOWeGzRPhGyuBDNyD5tkm89KOyYCRz-bkWK_p4aHAS3NG8P7rbH2stv9ZzNQM6YXQlpIkidnLUInlpOgqPJi3UwqF85x5scAPP-LHihI0Yx581e08In8l-aDGsgREXY3EmrqicVJJpPXHmlxvQuPqbtv8scwd-GumYjZ9FMCqfdfCXByVaSAPR1uupGenEscmIyUotS5Z1nt12cavCJUkEZzcuPL8RB4HdRA1W008KfHuyOM2u1-jD2EgVaBlH8QqIF79v0XubGPwNknrPygl4AGkIbr9Q";
    var socket = new SockJS('/api-strategy-socket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/corn', function (greeting) {
			console.log(greeting);
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/corn", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message.name + " - " + message.count + " - " + message.lastUpdate + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});