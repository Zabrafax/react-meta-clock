package com.metaclock.backend;

import com.metaclock.backend.core.MetaClock;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(scanBasePackages = "com.metaclock.backend")
public class MetaClockApplication {

	public static void main(String[] args) {
		SpringApplication.run(MetaClockApplication.class, args);
	}
}
