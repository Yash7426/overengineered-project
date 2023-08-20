package com.example.Email.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Email.model.EmailModel;
import com.example.Email.service.EmailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/contact")
public class EmailController {
    

    @Autowired
    private EmailService emailService;

    @PostMapping("/")
    public ResponseEntity<?> sendEmail(@RequestBody EmailModel emailmodel){
        System.out.println(4);
        try {
            boolean b=this.emailService.sendEmail(emailmodel);
            if(b){
                return ResponseEntity.status(HttpStatus.OK).body("null");
            }
            else{
                throw new Error("Error sending mail");
            }
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("null");
        }
    }
}
