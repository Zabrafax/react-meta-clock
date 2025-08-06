FROM eclipse-temurin:21-jdk-alpine

RUN apk add --no-cache maven

COPY . /app
WORKDIR /app

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/MetaClock.jar"]