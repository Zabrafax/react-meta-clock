package com.metaclock.backend;

import com.metaclock.backend.core.numbers.NumbersMapping3X2;
import com.metaclock.backend.core.numbers.SeparatorsMapping3X2;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableScheduling
@SpringBootApplication(scanBasePackages = "com.metaclock.backend", exclude = {SecurityAutoConfiguration.class })
public class MetaClockApplication {

	public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> {
            if (System.getenv(entry.getKey()) == null) {
                System.setProperty(entry.getKey(), entry.getValue());
            }
        });

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

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
