package com.github.rafli_lutfi.superpos.api.controllers;

import com.github.rafli_lutfi.superpos.api.dtos.mappers.UserRequestMapper;
import com.github.rafli_lutfi.superpos.api.dtos.mappers.UserResponseMapper;
import com.github.rafli_lutfi.superpos.api.dtos.requests.LoginRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.RegisterRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.LoginResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.User;
import com.github.rafli_lutfi.superpos.api.services.UserService;
import com.github.rafli_lutfi.superpos.api.utils.customResponse.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody @Validated RegisterRequestDTO requestDTO){
        userService.register(UserRequestMapper.fromRegisterRequestDTO(requestDTO));

        ApiResponse<?> apiResponse = new ApiResponse<>(HttpStatus.CREATED.value(), "success", null);

        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody @Validated LoginRequestDTO requestDTO){
        Map<String, Object> loginData = userService.Login(UserRequestMapper.fromLoginRequestDTO(requestDTO));

        String token = (String) loginData.get("token");
        User user = (User) loginData.get("user");
        LoginResponseDTO responseDTO = UserResponseMapper.toLoginResponseDTO(token, user);

        ApiResponse<?> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
