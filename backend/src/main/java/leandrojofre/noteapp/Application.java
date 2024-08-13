package leandrojofre.noteapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Running in: http://localhost:8081/notes
// HTTP calls handled with Postman: https://web.postman.co/

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
