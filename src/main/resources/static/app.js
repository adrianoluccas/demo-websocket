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
	var jwt = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYTdRcEpqMFRjUE1OUGo5VlVHbE5JbFNtUk5wSTNtd1BhdFVySDhraHFrIn0.eyJleHAiOjE2MzU0NzI5OTgsImlhdCI6MTYzNTQ1NDk5OCwianRpIjoiN2MwYWNjYmEtNmY0Ny00MGRkLWI4YmUtNzJmNmRhYjU1ODUwIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5hZ3JvLWNoYWluLmNsdWIvYXV0aC9yZWFsbXMvYWdyb2NoYWluLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3MWVhZmFlNi1jOTBhLTRiMzAtYjY5YS05NGZkNjFkMjE0Y2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZ3JvY2hhaW4tYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjQ2NTk0NmFhLWQ3N2QtNDIxOC05NzJhLTk0MDcxYmRlMDMxNyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWdyb2NoYWluLWRldiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI0NjU5NDZhYS1kNzdkLTQyMTgtOTcyYS05NDA3MWJkZTAzMTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZHJpYW5vLmx1Y2NhcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZ2l2ZW5fbmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZW1haWwiOiJhZHJpYW5vLmx1Y2Nhc0BiYmNoYWluLmNvbS5iciJ9.YgrmIWH6WdHtSmRw2Ojs4XLIaQ0p76dAPCjx4H9Z7ZYtqjp_4ZQn13zudsy7_2YW2_96TXLdNEhvqR1iLhjCQTjaCDMCauowsrrT5NDmYRDhizz_d9PQMphOPpn-9_8yueJwirX6mHzjJx3-t4U_WyavyijMuSBwDWHcelCneDuoSLYkTo-bpgayH4NH2Q39n47dOk0ZNgeH4z5f1lOSwRTyKvonMoJTGnFABVA9qWFk640JVYII-6qQ2_PFxEqHBMVNpeg3bVUUlroomejoEQzDQZMcVvFlR97g8-ioSeVb9wgm3MBRc1mBB3tbIqUBCfbquuVYyJTZZwUlD5Q95A";
    var socket = new SockJS('http://localhost:9000/api-strategy-socket?access_token='+jwt);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/corn', function (greeting) {
			console.log(JSON.parse(greeting.body))
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
    $("#greetings").append("<tr><td>" + message.name + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});