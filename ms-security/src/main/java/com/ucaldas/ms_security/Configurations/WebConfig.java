package com.ucaldas.ms_security.Configurations;
import com.ucaldas.ms_security.Interceptors.SecurityInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
//Implemente la interfas WebMvcConfigurer
public class WebConfig implements WebMvcConfigurer {
    //Inyecta el interceptor
    @Autowired
    private SecurityInterceptor securityInterceptor;
    //InterceptorRegistry Permite configurar una capa de todo el proyecto
    // para que no todo sea tan visible
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

    
        // registry.addInterceptor(securityInterceptor)
        //         .addPathPatterns("/api/**")
        //         .excludePathPatterns("/api/public/**");
    

    }
}