package com.metaclock.backend;

import com.metaclock.backend.core.MetaClock;
import com.metaclock.backend.core.numbers.NumbersMapping3X2;
import com.metaclock.backend.core.numbers.SeparatorsMapping3X2;
import com.metaclock.backend.core.timezones.PopularTimeZones;
import com.metaclock.backend.socket.TimeSocketHandler;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;

@EnableScheduling
@SpringBootApplication(scanBasePackages = "com.metaclock.backend")
public class MetaClockApplication {

	public static void main(String[] args) {
		SpringApplication.run(MetaClockApplication.class, args);
	}

	@Bean
	public NumbersMapping3X2 numbersMapping3X2() {
		return new NumbersMapping3X2();
	}

    @Bean
    public SeparatorsMapping3X2 separatorsMapping3X2() {
        return new SeparatorsMapping3X2();
    }
}
