package com.metaclock.backend.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaclock.backend.core.MetaClock;
import com.metaclock.backend.core.numbers.ClockCoordinates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

@Component
public class TimeSocketHandler extends TextWebSocketHandler {
    ObjectMapper mapper = new ObjectMapper();
    private MetaClock metaClock;

    public TimeSocketHandler(MetaClock metaClock) {
        this.metaClock = metaClock;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Connection established: " + session.getId());
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if(session.isOpen()) {
                    System.out.println("Sending message to client...");
                    try {
                        ClockCoordinates[] clockCoordinates = metaClock.getClockCoordinatesArray();

                        String json = mapper.writeValueAsString(clockCoordinates);
//                        session.sendMessage(new TextMessage(json));
                        session.sendMessage(new TextMessage("{\"test\": \"hello\"}"));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                } else {
                    timer.cancel();
                }
            }
        }, 0, 1000);
    }
}
