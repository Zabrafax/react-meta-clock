package com.metaclock.backend.socket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaclock.backend.core.MetaClock;
import com.metaclock.backend.core.numbers.ClockCoordinates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TimeSocketHandler extends TextWebSocketHandler {
    private final Map<WebSocketSession, Parameters> clients = new ConcurrentHashMap<>();

    private static class Parameters {
        int rows;
        int cols;
        boolean isSecondsEnabled;
        boolean isSeparatorsEnabled;
        public Parameters(int rows, int cols, boolean isSecondsEnabled, boolean isSeparatorsEnabled) {
            this.rows = rows;
            this.cols = cols;
            this.isSecondsEnabled = isSecondsEnabled;
            this.isSeparatorsEnabled = isSeparatorsEnabled;
        }
    }

    ObjectMapper mapper = new ObjectMapper();
    private MetaClock metaClock;

    public TimeSocketHandler(MetaClock metaClock) {
        this.metaClock = metaClock;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Connection established: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payLoad = message.getPayload();

        JsonNode jsonNode = mapper.readTree(payLoad);

        String type = jsonNode.get("type").asText();

        if(type.equals("subscribe")) {
            if(jsonNode.get("rows") == null || jsonNode.get("cols") == null) {
                return;
            }

            int rows = jsonNode.get("rows").asInt();
            int cols = jsonNode.get("cols").asInt();

            boolean isSecondsEnabled = false;
            if(jsonNode.get("isSecondsEnabled") != null) {
                isSecondsEnabled = jsonNode.get("isSecondsEnabled").asBoolean();
            }

            boolean isSeparatorsEnabled = false;
            if(jsonNode.get("isSeparatorsEnabled") != null) {
                isSeparatorsEnabled = jsonNode.get("isSeparatorsEnabled").asBoolean();
            }

            clients.put(session, new Parameters(rows, cols, isSecondsEnabled, isSeparatorsEnabled));
            System.out.println("Client subscribed to " + rows + "x" + cols);
        }

        if (type.equals("unsubscribe")) {
            clients.remove(session);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        clients.remove(session);
        System.out.println("WebSocket closed: " + session.getId());
    }

    @Scheduled(fixedRate = 1000)
    public void sendClockDataToAllClients() {
        //System.out.println("Sending data to clients, total: " + clients.size());
        for (Map.Entry<WebSocketSession, Parameters> entry : clients.entrySet()) {
            WebSocketSession session = entry.getKey();

            if(session.isOpen()) {
                //System.out.println("Sending message to client...");
                try {
                    ClockGridResponse clockGridResponse = metaClock.getClockGridResponse(
                            entry.getValue().rows,
                            entry.getValue().cols,
                            entry.getValue().isSecondsEnabled,
                            entry.getValue().isSeparatorsEnabled
                    );

                    String json = mapper.writeValueAsString(clockGridResponse);
                    session.sendMessage(new TextMessage(json));

                    //System.out.println("Sent clock data to " + session.getId());
                    //session.sendMessage(new TextMessage("{\"test\": \"hello\"}"));
                } catch (IOException e) {
                    clients.remove(session);
                    System.err.println("Error while sending WebSocket message: " + e.getMessage());
                }
            } else {
                clients.remove(session);
            }
        }
    }
}
