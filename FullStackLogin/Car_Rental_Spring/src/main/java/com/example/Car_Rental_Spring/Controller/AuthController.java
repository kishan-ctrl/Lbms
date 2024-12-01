package com.example.Car_Rental_Spring.Controller;


import com.example.Car_Rental_Spring.DTO.AuthenticationRequest;
import com.example.Car_Rental_Spring.DTO.AuthenticationResponse;
import com.example.Car_Rental_Spring.DTO.SignupRequest;
import com.example.Car_Rental_Spring.DTO.UserDto;
import com.example.Car_Rental_Spring.Entity.User;
import com.example.Car_Rental_Spring.Repository.UserRepository;
import com.example.Car_Rental_Spring.Service.auth.authService;
import com.example.Car_Rental_Spring.Service.auth.jwt.UserService;
import com.example.Car_Rental_Spring.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.apache.coyote.http11.Constants.a;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;


    private final authService AuthService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        if (AuthService.hasCustomerWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("Student already exist with this email", HttpStatus.NOT_ACCEPTABLE);
        UserDto createCustomerDto = AuthService.createCustomer(signupRequest);
        if (createCustomerDto == null)
            return new ResponseEntity<>("Student not created, Come again later", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(createCustomerDto, HttpStatus.CREATED);

    }
@PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or pasword.");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(optionalUser.isPresent()){
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;


    }

        @PostMapping("/refresh-token")
        public ResponseEntity<Map<String, String>> refreshToken(@RequestBody Map<String, String> request) {
            String refreshToken = request.get("refreshToken");
            if (refreshToken == null || !jwtUtil.isTokenValid(refreshToken, null)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            String username = jwtUtil.extractUserName(refreshToken);
            UserDetails userDetails = authService.loadUserByUsername(username);

            String newAccessToken = jwtUtil.generateToken(userDetails);
            Map<String, String> tokens = new HashMap<>();
            tokens.put("accessToken", newAccessToken);
            tokens.put("refreshToken", refreshToken); // Optionally, generate a new refresh token

            return ResponseEntity.ok(tokens);
        }
    }




