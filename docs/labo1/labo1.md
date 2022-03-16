# Codage en nombre flottant
## bit de signe
```
if(nombre > 0)
{
    S = 0
}
else
{
    S=1
}
```

## Calcul du nombre de bit
Utilisateur choisis un nombre de bit.  
Les bits e et M se recalcule en fonction du nombre à encoder.

### Calcul du nombre de bit de e  (E)
```
E = round((log2(total_bits) - 1)^ (3/2))
```

### Nombre de bit pour M:
```
M = total_bits - s - e
```

### Calcul des bits de e et calcul de d
```
d = 2 ^ (E - 1) - 2

pour e:
e

while (2 ^ e < nombre)
{
    e+=1;
}

e' = e + d;
```

### Calcul des bits de la Mantisse
```
M: nbr bit mantisse
mEntier: valeur de la mantisse à coder en binaire
m: bits de m

m = ''
mEntier = nombre / 2 ^ e;
valeurDuBit_m_i = 0.5;
for i in range(M)
{
 if(mEntier > valeurDuBit_m_i)
 {
     mEntier -= valeurDuBit_m_i;
     m += '1';
 }
 else
 {
     m+= '0';
 }
 valeurDuBit_m_i = valeurDuBit_m_i/2;
}

m = bits de la mantisse
```



