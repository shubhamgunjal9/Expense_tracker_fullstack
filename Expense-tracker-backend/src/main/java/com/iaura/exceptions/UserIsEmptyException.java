package com.iaura.exceptions;

public class UserIsEmptyException extends RuntimeException {
    public UserIsEmptyException(String str) {
        super(str);
    }
}
