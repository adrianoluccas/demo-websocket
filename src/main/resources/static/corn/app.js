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
	var urlVar = 'http://localhost:9000/api-strategy-socket';
	var jwt = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYTdRcEpqMFRjUE1OUGo5VlVHbE5JbFNtUk5wSTNtd1BhdFVySDhraHFrIn0.eyJleHAiOjE2MzYwNjQ2ODMsImlhdCI6MTYzNjA0NjY4MywianRpIjoiOGZhNGJhNmItYTBkNy00MTc4LThjZjItY2Q4ZGRmYWQ5YjhmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5hZ3JvLWNoYWluLmNsdWIvYXV0aC9yZWFsbXMvYWdyb2NoYWluLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3MWVhZmFlNi1jOTBhLTRiMzAtYjY5YS05NGZkNjFkMjE0Y2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZ3JvY2hhaW4tYXBwIiwic2Vzc2lvbl9zdGF0ZSI6ImNkMzI1ZDkyLTViZWMtNDg4MC04MTgzLWNmYmQxZTdlZTdmZCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWdyb2NoYWluLWRldiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJjZDMyNWQ5Mi01YmVjLTQ4ODAtODE4My1jZmJkMWU3ZWU3ZmQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZHJpYW5vLmx1Y2NhcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZ2l2ZW5fbmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZW1haWwiOiJhZHJpYW5vLmx1Y2Nhc0BiYmNoYWluLmNvbS5iciJ9.muggDu5ESWdQbRSqIU8ZQQUnPxNBjUN7Vw2amj-cpZaswfkB-Eps79PjhfSb0kPknLtD7QJ9N-XNMXQozHtfOpgBeepF9-7TN6Uac4w9XHKODly5lG9xlqXc5h1IShOzpKhOtklqwbb-h65WKGu3zWKuhAMaOxdopC78jMiSaJDgSwmxvLRdzaYoq4gu83909CA7_uyM1gPaVICykPiSho6xJVbEnK1bwOpHMXoDRzCIjoz49XcaDnERT-kw9l1Ky7CKl93px13PWjdu_qD7z5v-CMrSiM-epQP4aLabOWVHwu8lDycVxHmiQ6vUuM0vSTUiLfn3KPeOGouPW0CGUw";
    var socket = new SockJS('https://api-dev.agro-chain.club/strategy/api-strategy-socket?access_token='+jwt);
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