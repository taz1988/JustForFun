int intensity[] = {0, 5, 10, 20, 10, 5, 0};
int index = 0;
int direction = 1;

void setup() {
   pinMode(3, OUTPUT);
   pinMode(5, OUTPUT); 
   pinMode(6, OUTPUT);
   pinMode(9, OUTPUT);
   pinMode(13, OUTPUT);
}

void loop() {
    analogWrite(3, intensity[index + 0]);
    analogWrite(5, intensity[index + 1]);
    analogWrite(6, intensity[index + 2]);
    analogWrite(9, intensity[index + 3]);
    digitalWrite(13, HIGH);
    delay(200);
    digitalWrite(13, LOW);
    delay(200);
    index = index + direction;
    if (index == 3 || index == 0) {
      direction = -direction;
    }
}
