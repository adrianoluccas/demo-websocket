package com.example.demo.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
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

//	@Scheduled(fixedDelay = 5000)
	public void bot() throws InterruptedException, ExecutionException, TimeoutException {
		System.out.println("bot");

		final String url = "ws://localhost:8080/gs-guide-websocket";

		final WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
		stompClient.setMessageConverter(new MappingJackson2MessageConverter());

		final StompSession stompSession = stompClient.connect(url, new StompSessionHandlerAdapter() {
		}).get(10, TimeUnit.SECONDS);

		stompSession.subscribe("/topic/greetings", new GreetingStompFrameHandler());
		stompSession.send("/app/hello", "count" + i++);
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
