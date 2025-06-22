package com.metaclock.backend.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaclock.backend.core.Clock;
import com.metaclock.backend.core.MetaClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

public class TimeSocketHandler extends TextWebSocketHandler {
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MetaClock metaClock;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if(session.isOpen()) {
                    try {
                        Clock clock = metaClock.getClock();
                        float secondArrowDegrees = clock.getSecondArrowDegrees();
                        float minuteArrowDegrees = clock.getMinuteArrowDegrees();
                        float hourArrowDegrees = clock.getHourArrowDegrees();

                        Map<String, Object> data = new HashMap<>();
                        data.put("secondArrowDegrees", secondArrowDegrees);
                        data.put("minuteArrowDegrees", minuteArrowDegrees);
                        data.put("hourArrowDegrees", hourArrowDegrees);

                        String json = mapper.writeValueAsString(data);
                        session.sendMessage(new TextMessage(json));
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
