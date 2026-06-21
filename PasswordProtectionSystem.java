import java.util.Scanner;
class Login{
   private String UserName;
   private String Password;

    public String getUserName(){
        return UserName;
    }

    public void setUserName(String UserName){

    for(int i = 0; i < UserName.length(); i++){

        if(UserName.charAt(i) == ' '){

            System.out.println("User name should not contain white spaces");
            return;
        }
    }

    this.UserName = UserName;
}

    //public void setUserName(String UserName){
        // for (int i=0;i<UserName.length();i++){
          //  if ((UserName.charAt(i)) == (' ')){

            //    System.out.println("User name should not contain white spaces");
              //  break;
            //}
           
        //}
        //this.UserName=UserName;
        
    //}

    //public void setUserName(String userName){

    //if(userName.contains(" ")){
        //System.out.println("Username should not contain spaces");
      //  return;
    //}

  //  this.userName = userName;
//}

    public String getPassword(){
       return Password;
    }

    public void setPassword(String Password){
         if (Password.length()>=8){
             this.Password=Password;
        }
        else{
            System.out.println("Password Contain Atleast 8 characters");
        }
        
    }

    public void loginCredentials(String loginUserName,String loginPassword){
        if((loginPassword.equals(getPassword())) && (loginUserName.equals(getUserName()))){

            System.out.println("Login Successfull");
        }
        else{
            return;
        }
            
    }


}

public class PasswordProtectionSystem {
    public static void main(String [] args){
        Scanner sc = new Scanner(System.in);
        Login obj = new Login();
        System.out.println("Enter your user name : ");
        
        String user_name = sc.nextLine();
        obj.setUserName(user_name);
        System.out.println("Enter ypur password : ");
        String user_password = sc.nextLine();
        obj.setPassword(user_password);
       
        System.out.println(obj.getUserName()+"\n"+obj.getPassword());
        obj.loginCredentials( obj.getUserName(),obj.getPassword());
    }
}
