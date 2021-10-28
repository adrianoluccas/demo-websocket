package com.example.demo.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

@Configuration
@EnableScheduling
public class BotMessage {

	private static int i = 0;

	@Scheduled(fixedDelay = 5000)
	public void bot() throws InterruptedException, ExecutionException, TimeoutException {
		System.out.println("bot");

		final String url = "ws://localhost:9000/api-strategy-socket?access_token=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYTdRcEpqMFRjUE1OUGo5VlVHbE5JbFNtUk5wSTNtd1BhdFVySDhraHFrIn0.eyJleHAiOjE2MzU0NzI5OTgsImlhdCI6MTYzNTQ1NDk5OCwianRpIjoiN2MwYWNjYmEtNmY0Ny00MGRkLWI4YmUtNzJmNmRhYjU1ODUwIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5hZ3JvLWNoYWluLmNsdWIvYXV0aC9yZWFsbXMvYWdyb2NoYWluLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3MWVhZmFlNi1jOTBhLTRiMzAtYjY5YS05NGZkNjFkMjE0Y2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZ3JvY2hhaW4tYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjQ2NTk0NmFhLWQ3N2QtNDIxOC05NzJhLTk0MDcxYmRlMDMxNyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWdyb2NoYWluLWRldiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI0NjU5NDZhYS1kNzdkLTQyMTgtOTcyYS05NDA3MWJkZTAzMTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZHJpYW5vLmx1Y2NhcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZ2l2ZW5fbmFtZSI6ImFkcmlhbm8ubHVjY2FzIiwiZW1haWwiOiJhZHJpYW5vLmx1Y2Nhc0BiYmNoYWluLmNvbS5iciJ9.YgrmIWH6WdHtSmRw2Ojs4XLIaQ0p76dAPCjx4H9Z7ZYtqjp_4ZQn13zudsy7_2YW2_96TXLdNEhvqR1iLhjCQTjaCDMCauowsrrT5NDmYRDhizz_d9PQMphOPpn-9_8yueJwirX6mHzjJx3-t4U_WyavyijMuSBwDWHcelCneDuoSLYkTo-bpgayH4NH2Q39n47dOk0ZNgeH4z5f1lOSwRTyKvonMoJTGnFABVA9qWFk640JVYII-6qQ2_PFxEqHBMVNpeg3bVUUlroomejoEQzDQZMcVvFlR97g8-ioSeVb9wgm3MBRc1mBB3tbIqUBCfbquuVYyJTZZwUlD5Q95A";

		final WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
		stompClient.setMessageConverter(new MappingJackson2MessageConverter());

		final StompSession stompSession = stompClient.connect(url, new StompSessionHandlerAdapter() {
		}).get(10, TimeUnit.SECONDS);

		stompSession.subscribe("/topic/corn", new GreetingStompFrameHandler());
		
		var order = new OrderSocketDTO();
		order.setCountOrder(i);
		order.setName("bot");
		order.setLastUpdate(new Date());
		
		stompSession.send("/app/corn", order );
	}
	 private static List<Transport> createTransportClient() {
		    final List<Transport> transports = new ArrayList<>();
		    transports.add(new WebSocketTransport(new StandardWebSocketClient()));
		    return transports;
		  }
	/*
	 * 
	 * WebSocketClient client = new StandardWebSocketClient();
	 * 
	 * WebSocketStompClient stompClient = new WebSocketStompClient(client);
	 * stompClient.setMessageConverter(new MappingJackson2MessageConverter());
	 * 
	 * StompSessionHandler sessionHandler = new CustomStompSessionHandler();
	 * 
	 * stompClient.connect("ws://localhost:8080/gs-guide-websocket",
	 * sessionHandler); Thread.sleep(5000);
	 * 
	 */
}

class GreetingStompFrameHandler implements StompFrameHandler {
	@Override
	public Type getPayloadType(final StompHeaders stompHeaders) {
		return String.class;
	}

	@Override
	public void handleFrame(final StompHeaders stompHeaders, final Object o) {
	}
}
