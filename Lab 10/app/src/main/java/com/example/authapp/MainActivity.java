package com.example.authapp;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

    EditText username, password, repassword, randNumber;
    Button signup, signin, btnRand;
    DBHelper DB;
    Random random = new Random();
    int sophie;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        username = (EditText) findViewById(R.id.username);
        password = (EditText) findViewById(R.id.password);
        repassword = (EditText) findViewById(R.id.repassword);
        randNumber = (EditText) findViewById(R.id.randNumber);
        signup = (Button) findViewById(R.id.btnsignup);
        signin = (Button) findViewById(R.id.btnsignin);
        btnRand = (Button) findViewById(R.id.btnRandNum);
        DB = new DBHelper(this);

        btnRand.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sophie = random.nextInt(100);
                Toast.makeText(MainActivity.this, "Random Number Generated is... " + Integer.toString(sophie), Toast.LENGTH_LONG).show();
            }
        });

        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String user = username.getText().toString();
                String pass = password.getText().toString();
                String repass = repassword.getText().toString();
                String randNum = randNumber.getText().toString();

                if(user.equals("")||pass.equals("")||repass.equals("")||randNum.equals(""))
                    Toast.makeText(MainActivity.this, "Please enter all the fields", Toast.LENGTH_SHORT).show();
                else if (!randNum.equals(Integer.toString(sophie))){
                    Toast.makeText(MainActivity.this, "Your Sophie is incorrect, Captcha Failed", Toast.LENGTH_SHORT).show();
                }
                else{
                    if(pass.equals(repass) && randNum.equals(Integer.toString(sophie))){
                        Boolean checkuser = DB.checkusername(user);
                        if(checkuser==false){
                            Boolean insert = DB.insertData(user, pass);
                            if(insert==true){
                                Toast.makeText(MainActivity.this, "Registered successfully", Toast.LENGTH_SHORT).show();
                                Intent intent = new Intent(getApplicationContext(),HomeActivity.class);
                                startActivity(intent);
                            }else{
                                Toast.makeText(MainActivity.this, "Registration failed", Toast.LENGTH_SHORT).show();
                            }
                        }
                        else{
                            Toast.makeText(MainActivity.this, "User already exists! please sign in", Toast.LENGTH_SHORT).show();
                        }
                    }else{
                        Toast.makeText(MainActivity.this, "Passwords not matching", Toast.LENGTH_SHORT).show();
                    }
                } }
        });

        signin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                startActivity(intent);
            }
        });
    }
}