package com.ucaldas.ms_security.Repositories;

import com.ucaldas.ms_security.Models.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{'email': ?0}")
    public User getUserByEmail(String email);
}
